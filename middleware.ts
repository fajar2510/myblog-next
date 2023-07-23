export {default} from "next-auth/middleware"

export const config  = {matcher:["/create"]}

// untuk membatasi akses ke halaman create hanya yang sudah Login