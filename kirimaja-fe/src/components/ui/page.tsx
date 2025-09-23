import type { ReactNode } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./breadcrumb";
import { cn } from "@/lib/utils";

export interface PageBreadcrumbItem {
	label: string;
	href: string;
}

interface PageProps {
	title?: string;
	children: ReactNode;
	action?: ReactNode;
	className?: string;
	breadcrumbs?: {
		items: PageBreadcrumbItem[];
		separator?: ReactNode;
	};
}

export const Page = ({
	title,
	children,
	action,
	className,
	breadcrumbs,
}: PageProps) => {
	return (
		<main
			className={cn(
				"w-full max-w-full overflow-x-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-6",
				className
			)}
		>
			{breadcrumbs && (
				<div className="mb-4">
					<Breadcrumb>
						<BreadcrumbList>
							{breadcrumbs.items.map((item, index) => {
								if (index === breadcrumbs.items.length - 1) {
									return (
										<BreadcrumbItem key={index}>
											<BreadcrumbPage>
												{item.label}
											</BreadcrumbPage>
										</BreadcrumbItem>
									);
								}
								return (
									<>
										<BreadcrumbItem key={index}>
											<BreadcrumbLink href={item.href}>
												{item.label}
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator>
											{breadcrumbs.separator}
										</BreadcrumbSeparator>
									</>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			)}
			{title && (
				<div className="my-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<h1 className="text-2xl sm:text-3xl font-bold truncate">
						{title}
					</h1>
					{action && (
						<div className="flex items-center justify-start sm:justify-end flex-shrink-0">
							{action}
						</div>
					)}
				</div>
			)}
			<div className="w-full max-w-full overflow-x-hidden">
				{children}
			</div>
		</main>
	);
};
