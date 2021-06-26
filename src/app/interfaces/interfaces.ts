export interface Componente {
    icon: string,
    name: string,
    redirectTo: string,
    type:string,
    activated: boolean
}
export interface Slide {
    component: string,
    img: string, 
    titulo: string, 
    desc: string, 
    link?: string ,
    btnTxt?: string
}