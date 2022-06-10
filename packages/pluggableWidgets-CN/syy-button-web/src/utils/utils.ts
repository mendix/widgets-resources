let userMenuPaths: string[] = [];
const USER_MENU = `Upms_UserMenu`;
export interface UserMenuType {
    path: string;
}

/**
 * get permission path from sessionStorage
 */
export const getAuthPaths = (): string[] => {
    if (userMenuPaths.length > 0) {
        return userMenuPaths;
    }

    const userMenu: UserMenuType[] = JSON.parse(window.sessionStorage.getItem(USER_MENU) || "[]");

    userMenuPaths = userMenu.map(({ path }: UserMenuType) => path).filter(path => !!path);

    return userMenuPaths;
};

export const getUserRoleNames = (): string => {
    return window.mx.session.getConfig("roles");
};

export const hasSomeRole = (role: string[]): boolean => {
    if (undefined === role) {
        return !0;
    }
    const roleNames = getUserRoleNames();
    return role.some(role => roleNames.includes(role));
};

export const hasSomeAdminRole = (): boolean => {
    return hasSomeRole(["Administrator"]);
};

/**
 * check auth path
 * @param authPath auth path
 */
export const checkPathPermission = (authPath: string): boolean => {
    if (authPath === "") {
        return true;
    }

    // 判断是否超级管理员权限，直接显示所有权限按钮
    if (hasSomeAdminRole()) {
        return true;
    }

    const authPaths = getAuthPaths();
    // 本地没有权限资源时，不要放出权限按钮
    // if (!authPaths.length) {
    //     return true;
    // }

    return authPaths.indexOf(authPath) !== -1;
};
