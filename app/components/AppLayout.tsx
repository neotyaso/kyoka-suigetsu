import CastleChat from "./CastleChat";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <CastleChat />
            <Footer />
        </div>
    );
}