import * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Chart2,
	BoxTick,
	Routing,
	Location,
	User,
	TruckFast,
	ClipboardTick,
	ClipboardClose,
	Buildings,
	UserTag,
	Shield,
	Truck,
} from "iconsax-reactjs";
import { Link, useLocation } from "react-router";
import { ProCard } from "./pro-card";
import { ChevronDown } from "lucide-react";
import { usePermission } from "@/hooks/use-permission";
import { PermissionGuard } from "./permission-guard";

type MenuItem = {
	title: string;
	url: string;
	icon: any;
	permission?: string;
}

const data = {
	versions: [],
	navMain: [
		{
			title: "Main Menu",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
					icon: Chart2,
					// Dashboard is accessible to all authenticated users
				},
				{
					title: "Kirim Paket",
					url: "/send-package",
					icon: BoxTick,
					permission: "shipments.create",
				},
				{
					title: "Lacak Paket",
					url: "/track-package",
					icon: Routing,
					// Track package is accessible to all authenticated users
				},
				{
					title: "Daftar Pengiriman",
					url: "/delivery",
					icon: ClipboardTick,
					permission: "delivery.read",
				},
				{
					title: "Scan Paket",
					url: "/shipment-branch",
					icon: Truck,
					permission: "shipment-branch.read",
				},
				{
					title: "History",
					url: "/history",
					icon: ClipboardClose,
					// History is accessible to all authenticated users
					permission: "history.read",
				},
				{
					title: "Alamat Saya",
					url: "/user-addresses",
					icon: Location,
					// User addresses is accessible to all authenticated users
				},
				{
					title: "Profile",
					url: "/profile",
					icon: User,
					// Profile is accessible to all authenticated users
				},
			],
		},
	],
	masterSidebar: [
		{
			title: "Master",
			items: [
				{
					title: "Cabang",
					url: "/branch",
					icon: Buildings,
					permission: "branches.read",
				},
				{
					title: "Karyawan",
					url: "/employee",
					icon: UserTag,
					permission: "employee.read",
				},
				{
					title: "Role",
					url: "/role",
					icon: Shield,
					permission: "permissions.read",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();
	const { hasPermission } = usePermission();
	const isActive = (url: string) => {
		if (location.pathname.startsWith(url)) {
			if (url === "/") {
				return location.pathname === "/";
			} else {
				return location.pathname.startsWith(url);
			}
		}
	};
	// untuk menghilangkan pilihan(collaps master jika role nya beda)
	const hasAccessToMasterMenu = (items: MenuItem[]) => {
		return items.some((item) => {
			if (item.permission) {
				return hasPermission(item.permission);
			}
			return true;
		});
	};

	const renderMenuItem = (item: MenuItem) => {
		if (item.permission) {
			return (
				<PermissionGuard key={item.title} permission={item.permission}>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={isActive(item.url)}
							size={"lg"}
						>
							<Link to={item.url}>
								<item.icon 
									size={30}
									variant="Bold"
									className={
										isActive(item.url)
											? "text-primary"
											: "text-secondary"
									}
								/>
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</PermissionGuard>
			);
		};

		return (
			<SidebarMenuItem key={item.title}>
				<SidebarMenuButton
					asChild
					isActive={isActive(item.url)}
					size={"lg"}
				>
					<Link to={item.url}>
						<item.icon 
							size="30"
							variant="Bold"
							className={
								isActive(item.url)
									? "text-primary"
									: "text-secondary"
							}
						/>
						<span>{item.title}</span>
					</Link>
				</SidebarMenuButton>				
			</SidebarMenuItem>
		);
	};

	const renderMasterMenuItem = (item: MenuItem) => {
		if (item.permission) {
			return (
				<PermissionGuard key={item.title} permission={item.permission}>
					<SidebarMenuSubItem>
						<SidebarMenuButton
							asChild
							isActive={isActive(item.url)}
							size="lg"
						>
							<Link to={item.url}>
								<item.icon 
									size="24"
									variant="Bold"
									className={
										isActive(item.url)
											? "text-primary"
											: "text-secondary"
									}
								/>
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuSubItem>
				</PermissionGuard>
			);
		};

		return (
			<SidebarMenuSubItem key={item.title}>
				<SidebarMenuButton
					asChild
					isActive={isActive(item.url)}
					size="lg"
				>
					<Link to={item.url}>
						<item.icon 
							size="24"
							variant="Bold"
							className={
								isActive(item.url)
									? "text-primary"
									: "text-secondary"
							}
						/>
						<span>{item.title}</span>
					</Link>
				</SidebarMenuButton>				
			</SidebarMenuSubItem>
		);
	};

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<TruckFast
					className="text-primary size-8 mr-3"
					variant="Bulk"
					size={32}
				/>
				<div className="flex flex-col gap-0.5 leading-none">
					<span className="font-bold text-xl">GoKirim</span>
				</div>
			</SidebarHeader>
			<SidebarContent className="p-6 pt-0">
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map(renderMenuItem)}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
				{data.masterSidebar.map((masterGroup) => {
					// Only render master section if user has access to at least one menu item
					if (!hasAccessToMasterMenu(masterGroup.items)) {
						return null;
					}

					return (
						<Collapsible
							key={masterGroup.title}
							defaultOpen
							className="group/collapsible"
						>
							<SidebarGroup>
								<SidebarGroupLabel asChild>
									<CollapsibleTrigger className="flex items-center justify-between w-full 
									cursor-pointer h-12 text-sm font-medium hover:bg-sidebar-accent 
									hover:text-sidebar-accent-foreground rounded-md ">
										{masterGroup.title}
										<ChevronDown className="ml-auto transition-transform group-data-[state=open]/
										collapsible:rotate-180" />
									</CollapsibleTrigger>
								</SidebarGroupLabel>
								<CollapsibleContent>
									<SidebarGroupContent>
										<SidebarMenuSub>
											{masterGroup.items.map(
												renderMasterMenuItem
											)}
										</SidebarMenuSub>
									</SidebarGroupContent>
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
					);
				})}
				<ProCard />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
