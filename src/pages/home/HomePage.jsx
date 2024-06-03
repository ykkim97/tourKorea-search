import { Grid } from "@mui/material";
import React from "react";
import RegionCard from "./components/RegionCard";

function HomePage({
    searchRegion
}) {
    return (
        <>
            {searchRegion && searchRegion.map((item) => (
                <Grid item key={item.contentid} xs={12} sm={6} md={4} lg={3}>
                    <RegionCard item={item} />
                </Grid>
            ))}
        </>
    )
}

export default HomePage;