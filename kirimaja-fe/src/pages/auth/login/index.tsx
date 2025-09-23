import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { TruckFast } from "iconsax-reactjs";
import { useMeta, META_DATA } from "@/hooks/use-meta";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
	Form, 
	FormControl, 
	FormField, 
	FormItem, 
	FormLabel, 
	FormMessage 
} from "@/components/ui/form";

export default function LoginPage() {
	// Use custom meta hook
	useMeta(META_DATA.login);

	const { login, isLoggingIn } = useAuth();

	// Form setup with Zod validation
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// Handle form submission
	const onSubmit = (values: LoginFormData) => {
		login(values);
	};

	return (
		<>
			<div className="h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
				{/* Left side - Login Form */}
				<div className="flex flex-col items-center justify-center max-w-lg mx-auto w-full space-y-6 lg:order-1 p-4 overflow-y-auto">
					{/* Logo */}
					<div className="text-center">
						<div className="flex items-center justify-center mb-6">
							<TruckFast
								className="text-primary size-8 mr-3"
								variant="Bulk"
								size={32}
							/>
							<h1 className="text-3xl font-bold text-dark-green">
								KirimAja
							</h1>
						</div>
					</div>

					{/* Welcome Text */}
					<div className="text-center space-y-2">
						<h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
							Selamat Datang Kembali! 👋
						</h2>
						<p className="text-gray-600 text-base">
							Masuk ke akun Anda untuk melanjutkan
						</p>
					</div>

					{/* Login Form */}
					<div className="w-full p-6 lg:p-8">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"							
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base font-medium text-gray-900">
												Email
											</FormLabel>
											<FormControl>
												<Input 
													{...field}
													type="email"
													placeholder="Email"
													className="h-12 px-4 text-base bg-gray-50 border-gray-200
													focus:bg-white focus:border-primary rounded-lg transition-colors"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField 
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base font-medium text-gray-900">
												Password
											</FormLabel>
											<FormControl>
												<Input 
													{...field}
													type="password"
													placeholder="Password"
													className="h-12 px-4 text-base bg-gray-50 border-gray-200
													focus:bg-white focus:border-primary rounded-lg transition-colors"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>	
									)}
								/>
								<Button
									className="w-full mt-4"
									type="submit"
									variant="darkGreen"
									disabled={isLoggingIn}
								>
									{isLoggingIn ? "Memproses..." : "Masuk"}
								</Button>
							</form>
						</Form>
						<p className="mt-4 text-center text-sm text-gray-600">
							Belum punya akun?{" "}
							<Link
								to="/auth/register"
								className="text-primary font-medium hover:underline"
							>
								Daftar di sini
							</Link>
						</p>
					</div>
				</div>

				{/* Right side - Illustration */}
				<div className="lg:order-2 w-full h-screen hidden lg:block">
					<div className="lg:hidden w-full max-w-sm mx-auto mb-8 p-4">
						<img
							src="/images/login.png"
							alt="Dashboard Preview"
							className="w-full h-auto object-contain rounded-2xl shadow-lg"
						/>
					</div>

					<div className="hidden lg:block w-full h-screen relative overflow-hidden">
						<img
							src="/images/login.png"
							alt="KirimAja Dashboard Interface"
							className="w-full h-full object-cover object-left-top"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

