import { OAuthCallback } from "../../lib/oauth/oauthCallback";

function OAuthCallbackPage() {
    return <OAuthCallback />;
}

function SelfLayout({ children }) {
    return (<>{children}</>)
}
export default OAuthCallbackPage;
OAuthCallbackPage.PageLayout = SelfLayout;