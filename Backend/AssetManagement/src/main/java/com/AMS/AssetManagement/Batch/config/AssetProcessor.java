package com.AMS.AssetManagement.Batch.config;

import com.AMS.AssetManagement.entity.AssetLocation;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public class AssetProcessor implements ItemProcessor<AssetLocation, AssetLocation> {

    @Override
    @Nullable
    public AssetLocation process(@NonNull AssetLocation item) throws Exception {
         return null;
    //     throw new UnsupportedOperationException("Unimplemented method 'process'");
     }

    // @Override
    // public AssetLocation process(AssetLocation item) throws Exception {
    //     return null;
    // }
}
