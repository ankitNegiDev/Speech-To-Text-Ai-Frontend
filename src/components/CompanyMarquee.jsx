

function CompanyMarquee() {
    const companies = [
        'slack', 'framer', 'netflix', 'google', 'linkedin', 'instagram', 'facebook'
    ];

    return (
        <div className="w-full overflow-hidden py-8 mt-10 bg-transparent flex justify-center">
            <div className="relative flex animate-marquee w-max">
                <div className="flex items-center space-x-8 sm:space-x-12 md:space-x-16">
                    {companies.concat(companies).map((company, index) => (
                        <img
                            key={index}
                            alt={company}
                            className="h-6 sm:h-8 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition duration-200"
                            draggable="false"
                            src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CompanyMarquee;
