type Props = {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}