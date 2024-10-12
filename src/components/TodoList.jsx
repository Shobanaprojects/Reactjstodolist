import { Fragment } from "react";
import CustomButton from "./CustomButton";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const TodoList = ({ todolist, onDeletetask, onEdittask }) => {


    
    return (
        <Fragment>
            {todolist.map((data, index) =>
                <div key={index} className="todolist">
                    <div className="row">
                        <div className="col-8 col-md-10">
                            <div className="form-check">
                                <input class="form-check-input" type="checkbox"/>
                                <label className="text-break todolist-des">{data}</label>                                
                            </div>
                        </div>

                        <div className="col-2 col-md-1">
                            <CustomButton btnOnclick={() => onEdittask(index)} className="btn btn-sm" icon={faPenToSquare} />
                        </div>
                        <div className="col-2 col-md-1">
                            <CustomButton btnOnclick={() => onDeletetask(index)} className="btn btn-sm" icon={faTrashCan} />
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
export default TodoList;