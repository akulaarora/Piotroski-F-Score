import React from 'react';
import {Box, Heading, Link} from "@chakra-ui/core"
import { Table } from './Table';


function App() {
    return (
        <Box>
            <title>Piotroski's F-Score</title>
            <Link
                href="https://en.wikipedia.org/wiki/Piotroski_F-score#:~:text=Piotroski%20F%2Dscore%20is%20a,Stanford%20accounting%20professor%20Joseph%20Piotroski"
                isExternal>
                <Heading textAlign="center">Piotroski's F-Score</Heading>
            </Link>
            <Table />
        </Box>
    );
}

export default App;

