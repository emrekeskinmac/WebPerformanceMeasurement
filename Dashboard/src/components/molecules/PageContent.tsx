import * as React from "react";
import { Site, Page } from "tabler-react";


const PageContent: React.FC<{}> = (props) => {
    return (
        <>
            <Site.Wrapper
                headerProps={{
                    href: "/",
                    alt: "Dashboard",
                    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwoRFRsXg6YXDCTWz6S94aaiRZZ-WB-B0WaS8yypmvmi03-Kb-&s",
                }}
            >
                <Page.Content>
                    {props.children}
                </Page.Content>
            </Site.Wrapper>
        </>
    );
};

PageContent.displayName = 'PageContent';

export default PageContent;
