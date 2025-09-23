export { Input };

import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import type { Icon, IconProps } from "iconsax-reactjs";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	startIcon?: Icon;
	endIcon?: Icon;
	iconProps?: IconProps;
	containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			startIcon,
			endIcon,
			containerClassName,
			iconProps = {},
			...props
		},
		ref
	) => {
		const [show, setShow] = React.useState(false);
		const StartIcon = startIcon;
		const EndIcon = endIcon;
		const { className: iconClassName, ...iconRest } = iconProps;

		if (type === "password") {
			return (
				<div className={cn("w-full relative", containerClassName)}>
					{/* <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
						<Lock
							size={18}
							className={cn(
								"text-muted-foreground",
								iconClassName
							)}
							{...iconRest}
						/>
					</div> */}
					<input
						autoComplete="off"
						type={!show ? type : "text"}
						data-slot="input"
						className={cn(
							"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent pr-3 pl-7 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
							"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
							"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
							className
						)}
						ref={ref}
						{...props}
					/>
					<button
						onClick={() => setShow((prev) => !prev)}
						className="absolute right-3 top-1/2 transform -translate-y-1/2"
						type="button"
					>
						{show ? (
							<Eye className="stroke-slate-700/70" size={18} />
						) : (
							<EyeOff className="stroke-slate-700/70" size={18} />
						)}
					</button>
				</div>
			);
		}

		return (
			<div className={cn("w-full relative", containerClassName)}>
				{StartIcon && (
					<div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
						<StartIcon
							size={18}
							className={cn(
								"text-muted-foreground",
								iconClassName
							)}
							{...iconRest}
						/>
					</div>
				)}
				<input
					type={type}
					data-slot="input"
					className={cn(
						"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
						"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
						startIcon ? "pl-8" : "",
						endIcon ? "pr-8" : "",
						className
					)}
					ref={ref}
					{...props}
				/>
				{EndIcon && (
					<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
						<EndIcon
							className={cn(
								"text-muted-foreground",
								iconClassName
							)}
							{...iconRest}
							size={18}
						/>
					</div>
				)}
			</div>
		);
	}
);
