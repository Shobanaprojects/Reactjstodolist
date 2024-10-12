import { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomButton = ({className, title, type, icon, btnOnclick}) =>{
    return(
        <Fragment>
            <button className={className} type={type} onClick={btnOnclick}>{title} {icon && <FontAwesomeIcon icon={icon}/>}
            </button>
        </Fragment>
    )
}
export default CustomButton;