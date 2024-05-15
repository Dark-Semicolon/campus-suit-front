import { NavLink } from "react-router-dom"

function HeaderList() {

    const list = [
        { name: "الصفحة الرئيسية", to: '/' },
        // { name: 'عن المنصة', to: '/about' },
        // { name: 'السنين الدراسية', to: '/' },
        { name: 'الكورسات', to: '/courses' },
        // { name: 'تواصل معنا', to: '/' }
    ]

    return (
        <ul className="flex items-center gap-4">
            {
                list.map((item, index) => {
                    return (
                        <li key={index} className="text-xl font-semibold transition-colors text-gray-color-light hover:text-white">
                            <NavLink to={item.to} className={({ isActive }) =>
                                isActive ? 'text-active-navLink' : null
                            }>{item.name}</NavLink>
                        </li>
                    );
                })
            }
        </ul>
    )
}

export default HeaderList
