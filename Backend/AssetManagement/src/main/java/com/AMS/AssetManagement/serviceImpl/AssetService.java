package com.AMS.AssetManagement.serviceImpl;


import org.springframework.stereotype.Service;

@Service
public class AssetService {

//    @Autowired
//    AssetRepository assetRepository;
//
//    public Optional<Asset> create(Asset asset){
//        if (assetRepository.existsById(asset.getAssetId())){
//            return Optional.empty();
//        }else{
//            asset.setCreatedDate(new Date());
//            asset.setUpdatedDate(new Date());
//            return Optional.of(assetRepository.save(asset));
//        }
//    }
//
//
//    public List<Asset> retrieve(){
//        return assetRepository.findAll();
//    }
//
//    public Optional<Asset> retrieveOne(int id){
//        return assetRepository.findById(id);
//    }
//
//    public Optional<Asset> update(Asset asset){
//        Optional<Asset> checkAsset = assetRepository.findById(asset.getAssetId());
//        if (assetRepository.existsById(asset.getAssetId())){
//            asset.setCreatedDate(checkAsset.get().getCreatedDate());
//            asset.setUpdatedDate(new Date());
//            return Optional.of(assetRepository.save(asset));
//        }else{
//            return Optional.empty();
//        }
//    }
//
//    public String delete(int assetId){
//        if (assetRepository.existsById(assetId)){
//            assetRepository.deleteById(assetId);
//            return assetId + " deleted successfully!";
//        }else{
//            return "The Asset data does not exist in records!";
//        }
//
//    }

}
