import { useState } from "react";
import axios from "axios";
import RegionCard from "./pages/home/components/RegionCard";
import Grid from '@mui/material/Grid';

export default function Home ({
    searchRegion,
    setSearchRegion
}) {
    return (
        <Grid container spacing={2} sx={{ padding: "30px" }}>
            {searchRegion&& searchRegion.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.contentid}>
                    <RegionCard item={item} />
                </Grid>
            ))}
        </Grid>
    )
}
