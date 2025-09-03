import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { console } from 'inspector';
import * as path from 'path';

const prisma = new PrismaClient();

export async function employeeBranchesSeed() {
    const employeeBranchesPath = path.resolve(
        __dirname,
        'data',
        'employee-branches.json');
    const employeeBranchesRaw = fs.readFileSync(employeeBranchesPath, 'utf-8');
    const employeeBranches = JSON.parse(employeeBranchesRaw).data;

    const branchCache = new Map<string, number>();
    for (const employeeBranch of employeeBranches) {
        const role = await prisma.role.findFirst({
            where: { key: employeeBranch.role_key },
        });

        if (!role) {
            console.error(
                `Role with key "${employeeBranch.role_key}" not found, skipping employee branch creation`,
            );
            continue;
        }

        const branch = await prisma.branch.findFirst({
            where: { name: employeeBranch.branchName },
        });

        if (!branch) {
            console.error(
                `Branch with name "${employeeBranch.branchName}" not found, skipping employee branch creation`,
            );
            continue;
        }

        const user = await prisma.user.upsert({
            where: { email: employeeBranch.email },
            update: {},
            create: {
                name: employeeBranch.name,
                email: employeeBranch.email,
                phoneNumber: employeeBranch.phoneNumber,
                password: await bcrypt.hash(employeeBranch.password, 10),
                avatar: employeeBranch.avatar || null,
                roleId: role.id,
            },
        });

        const existingEmployeeBranch = await prisma.employeeBranch.findFirst({
            where: { userId: user.id, branchId: branch.id },
        });

        if (existingEmployeeBranch) {
            console.log(
                `⚠️ Employee branch for user "${user.email}" at branch "${branch.name}" already exists, skipping`
            );
            continue;
        }

        await prisma.employeeBranch.create({
            data: {
                userId: user.id,
                branchId: branch.id,
                type: employeeBranch.type,
            },
        });

        console.log(
            `🌱 Employee branch for user "${user.email}" at branch "${branch.name}" seeded successfully`,
        );
    }
}

// For running directly
if (require.main === module) {
    employeeBranchesSeed()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}
