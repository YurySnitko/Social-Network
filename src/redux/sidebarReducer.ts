type SidebarItemType = {
    id: number
    name: string
}

let initialState = [
    {id: 1, name: "Dima"},
    {id: 2, name: 'Margo'},
    {id: 3, name: "Andrew"},
] as Array<SidebarItemType>;

type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer;