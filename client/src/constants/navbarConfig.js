export function getNavbarInfo(pathname) {

    if (pathname === "/dashboard") {

        return {

            breadcrumb: ["Dashboard"],
            title: "Launches",
            description: "Manage and monitor all product launches."

        };

    }

    if (pathname === "/dashboard/calendar") {

        return {

            breadcrumb: ["Dashboard", "Calendar"],
            title: "Calendar",
            description: "View upcoming launches and organize your release schedule."

        };

    }

    if (pathname === "/dashboard/archive") {

        return {

            breadcrumb: ["Dashboard", "Archive"],
            title: "Archive",
            description: "Browse and review archived product launches."

        };

    }

    if (pathname === "/dashboard/launches/new") {

        return {

            breadcrumb: ["Dashboard", "Create"],
            title: "Create Launch",
            description: "Create a new product launch."

        };

    }

    if (pathname.includes("/edit")) {

        return {

            breadcrumb: ["Dashboard", "Edit"],
            title: "Edit Launch",
            description: "Update launch information and assets."

        };

    }

    if (/^\/dashboard\/launches\/\d+$/.test(pathname)) {

        return {

            breadcrumb: ["Dashboard", "Details"],
            title: "Launch Details",
            description: "Review launch information."

        };

    }

    return {

        breadcrumb: ["Dashboard"],
        title: "Dashboard",
        description: ""

    };

}