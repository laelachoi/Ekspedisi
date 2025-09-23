import { Separator } from "@radix-ui/react-separator";
import { Outlet } from "react-router";
import { AppSidebar } from "../app-sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { API_CONFIG } from "@/lib/api/config";

export default function AuthenticatedLayout() {
	const { user, logout, isLoggingOut } = useAuth();
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="w-full max-w-full overflow-x-hidden">
				<header className="flex py-4 sm:py-[30px] shrink-0 items-center gap-2 border-b px-4 bg-white w-full max-w-full overflow-x-hidden">
					<SidebarTrigger className="-ml-1 flex-shrink-0" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4 flex-shrink-0"
					/>
					<div className="flex justify-between w-full items-center gap-2 min-w-0">
						<Input
							placeholder="Cari product, pengiriman, tujuan, dll"
							className="h-10 hidden sm:block"
							containerClassName="max-w-sm flex-1"
						/>
						<div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
							<DropdownMenu>
								<DropdownMenuTrigger
									asChild
									className="flex items-center justify-center w-full h-8 rounded"
								>
									<div className="cursor-pointer flex items-center gap-2 pr-2 sm:pr-4 min-w-0">
										<img
											src={
												user?.avatar
													? `${API_CONFIG.baseURL}/${user?.avatar}`
													: "/images/vespa-tiger.jpg"
											}
											alt="User Avatar"
											className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
										/>
										<div className="hidden sm:flex flex-col gap-0.5 min-w-0">
											<span className="font-bold truncate">
												{user?.name || "User Name"}
											</span>
											<span className="text-sm truncate">
												{user?.role?.name || "User Role"}
											</span>
										</div>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>
										My Account
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem
										onClick={logout}
										disabled={isLoggingOut}
									>
										{isLoggingOut
											? "Logging out..."
											: "Logout"}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</header>
				<div className="w-full max-w-full overflow-x-hidden">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
