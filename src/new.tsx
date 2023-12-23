import React from 'react';
import Template from "./packages/components/template";
import initialItems from "./json/initialItem";
import DataSource from "./json/datasource.json";


function New() {
    return (
            <Template DataSource={DataSource} operate="edit" initialItems={initialItems} />
    );
}

export default New;
