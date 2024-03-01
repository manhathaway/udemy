export default function Tabs({ buttons, children, Container = "menu" }) {
    return (
        <>
            <Container>{buttons}</Container>
            {children}
        </>
    )
};