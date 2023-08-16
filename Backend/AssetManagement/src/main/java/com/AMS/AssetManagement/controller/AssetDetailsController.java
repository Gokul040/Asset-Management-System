package com.AMS.AssetManagement.controller;

import com.AMS.AssetManagement.entity.AssetDetails;

import com.AMS.AssetManagement.repository.AssetDetailsRepository;

import com.AMS.AssetManagement.serviceImpl.AssetDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200",maxAge = 3600)
@RequestMapping("/asset-details")
public class AssetDetailsController {

    @Autowired
    AssetDetailsService assetDetailsService;

    @Autowired
    AssetDetailsRepository assetDetailsRepository;


    @PostMapping("/add-asset-details")
    public String saveAssetType(@RequestBody AssetDetails asset) {
        AssetDetails _addAsset = assetDetailsService.createAssetDetails(asset);
        return "Added Successfully" + _addAsset;
    }

    @GetMapping("/get-one-asset-details/{id}")
    public ResponseEntity<AssetDetails> getAssetById(@PathVariable("id") Long id) {
        Optional<AssetDetails> addAsset = assetDetailsService.getAssetDetailsById(id);
        if (addAsset.isPresent()) {
            return new ResponseEntity<>(addAsset.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-all-asset-details")
    public List<AssetDetails> getAllAssetType() {
        return assetDetailsService.getAllAssetDetails();
    }

    @PutMapping("/update-asset-details")
    public String updateAsset(@RequestBody AssetDetails asset) {
       Optional<AssetDetails> assetDetails = assetDetailsRepository.findById(asset.getId());
        if (assetDetails.isPresent()) {
            assetDetailsService.updateAssetDetails(asset);
            return "Asset has been updated successfully!";
        } else {
            return "Asset Type does not exist in records!";
        }
    }

    @DeleteMapping("/delete-asset-details/{id}")
    public String deleteAssetById(@PathVariable("id") Long id) {
        Optional<AssetDetails> assetDetails = assetDetailsRepository.findById(id);

        if(assetDetails.isPresent()){
            return assetDetailsService.deleteAssetDetails(id);
        }else
            return "asset not exist";
    }

}
