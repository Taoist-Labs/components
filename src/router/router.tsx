import { Route, Routes, Navigate } from "react-router-dom";
import New from "../new";
import Preview from "../previewPage";
import PreviewMobile from "../previewPageMobile"

function RouterLink() {
    return (<Routes>
                <Route path="/" element={<Navigate to="/new" />} />
                <Route path="/new" element={<New />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/previewMobile" element={<PreviewMobile />} />
        </Routes>

);
}
export default RouterLink;
