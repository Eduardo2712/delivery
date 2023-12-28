import { AsyncLocalStorage } from "async_hooks";
import { AdminEntity } from "src/entities/admin.entity";

export const AdminStorage = {
    storage: new AsyncLocalStorage<AdminEntity>(),
    get() {
        return this.storage.getStore();
    },
    set(admin: AdminEntity) {
        this.storage.enterWith(admin);
    }
};
