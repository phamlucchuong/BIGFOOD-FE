// import React, { useState, useEffect } from 'react';
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

export default function OrderManagerment() {

    return (
        <>
            <PageMeta
                title="Quản lý đơn hàng"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Quản lý đơn hàng" />
            <div className="space-y-6">
                {/* <CollectionSection title="" cards={categories} typeCard={true} /> */}
                {/* <BasicTableOne /> */}
            </div>
        </>

    );
};
