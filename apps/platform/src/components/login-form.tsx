import { Link, useNavigate } from "@tanstack/react-router"; // <-- Tambahkan useNavigate
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginForm } from "@/routes/login/-hook"; // <-- useLoginMutation dihapus karena tidak dipakai

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useLoginForm();
    
    // Inisialisasi navigasi
    const navigate = useNavigate(); 
    
    // Kita buat isPending statis false karena tidak ada proses nunggu backend lagi
    const isPending = false; 

    const handleLogin = handleSubmit(async (data) => {
        // BYPASS SISTEM LOGIN
        // 1. Simpan token palsu agar sistem mengira kita sudah diverifikasi
        localStorage.setItem("token", "dummy-demo-token");
        
        // 2. Langsung arahkan masuk ke halaman utama (Dashboard)
        navigate({ to: "/" }); 
    });

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to Demo Account</CardTitle>
                    <CardDescription>
                        Enter any email and password to access the UI demo.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="demo@nutrilog.com"
                                    required
                                    {...register("email")}
                                />
                                {errors.email?.message && (
                                    <FieldError>{errors.email?.message}</FieldError>
                                )}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Type anything..."
                                    required
                                    {...register("password")}
                                />
                                {errors.password?.message && (
                                    <FieldError>{errors.password?.message}</FieldError>
                                )}
                            </Field>
                            <Field>
                                <Button disabled={isPending} type="submit">
                                    {isPending ? "Logging in..." : "Login (Bypass)"}
                                </Button>
                                <FieldDescription className="text-center mt-4">
                                    This is a frontend-only demo. <br/> No real authentication is performed.
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}