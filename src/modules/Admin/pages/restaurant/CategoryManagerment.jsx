import React, { useState, useEffect } from 'react';
import CollectionSection from '../../../../sections/CollectionSection';
import handleLoadCategories from "../../../../hooks/data/useFoodCategory";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const CategoryManagerment = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await handleLoadCategories();
            setCategories(data);
        };
        fetchData();
    }, []);


    return (
        <>
            <PageMeta
                title="Danh sách nhà hàng"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Danh sách nhà hàng" />
            <div className="space-y-6">
                <CollectionSection title="" cards={categories} typeCard={true} />
                {/* <BasicTableOne /> */}
            </div>
        </>

    );
};

export default CategoryManagerment;