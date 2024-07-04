import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Helper } from "../../services/helper";

const TopBar = () => {
    const auth = useContext(AuthContext);
    const [topBarCards, setTopBarCards] = useState<{}[]>([]);

    useEffect(() => {
        Helper.getTopCardsByEmail().then((cards: any) => setTopBarCards(cards));
    }, [auth]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {
                topBarCards.length && topBarCards.map((card: any) => (
                    <Card key={card.id} sx={{ flex: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 150 }}>
                            <Typography variant="h4" color="primary.main" gutterBottom>{card.value}</Typography>
                            <Typography variant="h5" color="primary.main" fontWeight={600} sx={{ flexWrap: 'wrap' }}>{card.label}</Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </Box>
    );
}

export default TopBar;
