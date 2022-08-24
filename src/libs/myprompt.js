/**
 * 信息输入提示框
 */
import { ElMessageBox } from 'element-plus';

export default function myprompt(message, title = '系统提示', type = '') {
    return new Promise((resolve) => {
        ElMessageBox.prompt(message, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,
        })
            .then(() => {
                resolve();
            })
            .catch((error) => {});
    });
}
