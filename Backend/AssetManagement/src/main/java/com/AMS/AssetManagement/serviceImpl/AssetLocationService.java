package com.AMS.AssetManagement.serviceImpl;

import com.AMS.AssetManagement.entity.Employee;
import com.AMS.AssetManagement.repository.AssetLocationRepo;
import com.AMS.AssetManagement.repository.EmployeeRepo;
import com.AMS.AssetManagement.service.lAssetLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.AMS.AssetManagement.entity.AssetLocation;
import java.util.List;
import java.util.Optional;

@Service
public class AssetLocationService implements lAssetLocationService {

    @Autowired
    private AssetLocationRepo assetLocationRepo;
    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public AssetLocation createAssetLocation(AssetLocation assetLocation) {
            AssetLocation assetLocation1 = new AssetLocation();
            assetLocation1.setPlaceId(assetLocation.getPlaceId());
     return assetLocationRepo.save(assetLocation1);
    }

    @Override
    public String deleteAssetLocation(Long id) {
        Optional<AssetLocation> assetLocation = assetLocationRepo.findById(id);
       assetLocationRepo.delete(assetLocation.get());
        return "Deleted";
    }

    @Override
    public String updateAssetLocation(AssetLocation assetLocation) {
       AssetLocation assetLocation1 = assetLocationRepo.findById(assetLocation.getId()).orElseThrow(NullPointerException::new);
            assetLocation1.setPlaceId(assetLocation.getPlaceId());
            assetLocationRepo.save(assetLocation1);
            return "Update Successful";
    }

    @Override
    public List<AssetLocation> getAllAssetLocation() {
        return assetLocationRepo.findAll();
    }

    @Override
    public Optional<AssetLocation> getById(Long id) {
        Optional<AssetLocation> assetLocation = assetLocationRepo.findById(id);
        return assetLocation;
    }


    public AssetLocation getByLocationId(Long id) {
        Optional<Employee> employee = employeeRepo.findById(id);
        Optional<AssetLocation> assetLocation = assetLocationRepo.findById(employee.get().getAssetLocation().getId());
       return assetLocation.get();
   }
}
