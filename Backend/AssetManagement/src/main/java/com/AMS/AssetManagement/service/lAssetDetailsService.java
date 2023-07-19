package com.AMS.AssetManagement.service;

import com.AMS.AssetManagement.entity.AssetDetails;

import java.util.List;
import java.util.Optional;

public interface lAssetDetailsService {
    AssetDetails createAssetDetails(AssetDetails assetLocation);

    Optional<AssetDetails> getAssetDetailsById(Long id);

    String deleteAssetDetails(Long id);
    AssetDetails updateAssetDetails(AssetDetails assetLocation);
    List<AssetDetails> getAllAssetDetails();


}
