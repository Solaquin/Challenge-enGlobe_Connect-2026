import LaunchService from "./LaunchService";

const CalendarService = {

    async getMonthLaunches(month, year, filters = {}) {

        return LaunchService.getLaunches({

            ...filters,

            month,
            year

        });

    }

};

export default CalendarService;