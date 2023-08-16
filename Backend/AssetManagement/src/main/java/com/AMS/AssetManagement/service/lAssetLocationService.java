package com.AMS.AssetManagement.service;

import com.AMS.AssetManagement.entity.AssetLocation;

import java.util.List;
import java.util.Optional;


public interface lAssetLocationService {
    AssetLocation createAssetLocation(AssetLocation assetLocation);
    String deleteAssetLocation(Long id);
    String updateAssetLocation(AssetLocation assetLocation);
   List<AssetLocation> getAllAssetLocation();
   Optional<AssetLocation> getById(Long id);

}
