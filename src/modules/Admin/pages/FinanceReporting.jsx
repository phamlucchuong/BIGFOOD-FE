// import React, { useState, useEffect } from 'react';
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

export default function FinanceReporting () {

    return (
        <>
            <PageMeta
                title="Báo cáo tài chính"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Báo cáo tài chính" />
            <div className="space-y-6">
                {/* <BasicTableOne /> */}
            </div>
        </>

    );
};
