import React from 'react';

function CompanyMarquee() {
    let companies = [
        'slack', 'framer', 'netflix', 'google', 'linkedin', 'instagram', 'facebook'
    ];

    return (
        <div className="overflow-hidden py-6 bg-transparent mt-14">
            <div className="marquee-inner flex will-change-transform min-w-[200%] animate-marquee">
                <div className="flex items-center">
                    {companies.concat(companies).map(function (company, index) {
                        return (
                            <img
                                key={index}
                                alt={company}
                                className="h-10 w-auto mx-6 object-contain"
                                draggable="false"
                                src={"https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/" + company + ".svg"}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CompanyMarquee;
