export const CHANGE_PAGE_DATA = "CHANGE_PAGE_DATA";

export const changePageData = (page) => ({
    type: CHANGE_PAGE_DATA,
    page: page,
});

export default function PostReducer(
    state = {
        pageSize: 100,
        tableKey: "",
        page: [],
    },
    action
) {
    switch (action.type) {
        case CHANGE_PAGE_DATA:
            return {
                ...state,
                page: action.page,
            };
        default:
    }
    return state;
}
