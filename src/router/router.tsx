import { Route, Routes, Navigate } from "react-router-dom";
import New from "../new";
import Preview from "../Preview";


function RouterLink() {
    return (<Routes>
                <Route path="/" element={<Navigate to="/new" />} />
                <Route path="/new" element={<New />} />
                <Route path="/preview" element={<Preview />} />

        </Routes>

);
}
export default RouterLink;
