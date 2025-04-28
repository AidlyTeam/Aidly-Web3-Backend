
class UserService {
    Hello(name?: string): string | undefined {
        if (!name) return;
        return `Hello ${name}`;
    }
}

export default UserService;
