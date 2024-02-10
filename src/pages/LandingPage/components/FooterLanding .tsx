import { Stack } from "@mui/material"
import styles from '../landing.module.scss'
import FooterItem from './FooterItem'
const FooterLanding = () => {

    return (
        <Stack className={styles['footer_container']} margin="0 20px" direction={"row"} gap={5} justifyContent={"space-around"}>
            <FooterItem
                icon={<i className="fa-solid fa-bookmark"></i>}
                title={"About Us"}
                content={`Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Culpa adipisci ipsa quasi animi suscipit consequuntur repudiandae. Doloremque sint eos magnam`}
            />
            <FooterItem
                icon={<i className="fa-solid fa-inbox"></i>}
                title={"Solutions"}
                content={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius mollitia beatae eos ipsum magni architecto fugit dolorum assumenda autem ratione!"}
            />
            <FooterItem
                icon={<i className="fa-solid fa-folder"></i>}
                title={"Resources"}
                content={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quod exercitationem sapiente et fugiat? Autem dolores fugiat consequuntur optio quia."}
            />
        </Stack >
    )
}
export default FooterLanding 