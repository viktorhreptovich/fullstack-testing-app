package backend.services;

public class AuthService extends ServiceMock<AuthService> {

    public static AuthService signUp() {
        return new AuthService().post("/api/auth/signup");
    }

    public static AuthService signIn() {
        return new AuthService().post("/api/auth/signin");
    }

}
