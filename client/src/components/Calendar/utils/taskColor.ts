import {Categories} from "../../../types/Categories";
import {ITasks} from "../../../types/ITasks";

export const taskColor = (task:ITasks) => {
    if (task.categories.length !== 0)
        switch (task.categories[0]) {
            case Categories.CATEGORY_A:
                return'#ff944d'
                break;
            case Categories.CATEGORY_B:
                return '#ffd480'
                break;
            case Categories.CATEGORY_C:
                return '#00e6ac'
                break;
        }
}
