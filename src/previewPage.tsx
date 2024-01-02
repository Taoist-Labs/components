import React from 'react';
import Preview from "./packages/components/Preview";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";


function PreviewPage() {
    return (
        <Preview DataSource={DataSource} initialItems={initialItems}  theme={false} BeforeComponent={<div>-----test add after-----</div>} AfterComponent={<div>-----test add after-----</div>} />
    );
}

export default PreviewPage;
