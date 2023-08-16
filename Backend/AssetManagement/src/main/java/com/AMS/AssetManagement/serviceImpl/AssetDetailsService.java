package com.AMS.AssetManagement.serviceImpl;


import com.AMS.AssetManagement.entity.AssetDetails;
import com.AMS.AssetManagement.entity.Employee;
import com.AMS.AssetManagement.repository.EmployeeRepo;
import com.AMS.AssetManagement.service.lAssetDetailsService;
import com.AMS.AssetManagement.repository.AssetDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetDetailsService implements lAssetDetailsService {
    @Autowired
    private AssetDetailsRepository assetDetailsRepository;
    @Autowired
    private EmployeeRepo employeeRepo;

    public AssetDetails createAssetDetails(AssetDetails asset){
        AssetDetails assetDetails = new AssetDetails();
        assetDetails.setLaptop_name(asset.getLaptop_name());
        assetDetails.setEarPhoneStatus(asset.isEarPhoneStatus());
        assetDetails.setLanIdNumber(asset.getLanIdNumber());
        assetDetails.setKeyboardNumber(asset.getKeyboardNumber());
        assetDetails.setMouseStatus(asset.isMouseStatus());
        assetDetails.setLockerCode(asset.getLockerCode());
        assetDetails.setLaptopBag(asset.isLaptopBag());
        assetDetails.setLaptopChargerNumber(asset.getLaptopChargerNumber());
        assetDetails.setMonitorNumber(asset.getMonitorNumber());
        return assetDetailsRepository.save(assetDetails);
    }



    public List<AssetDetails> getAllAssetDetails(){
        return assetDetailsRepository.findAll();
    }



    @Override
    public Optional<AssetDetails> getAssetDetailsById(Long id) {
        Optional<Employee> employee = employeeRepo.findById(id);
        Optional<AssetDetails> assetDetails = assetDetailsRepository.findById(employee.get().getAssetDetails().getId());
        return assetDetails;
    }

    public String deleteAssetDetails(Long id){
        Optional<AssetDetails> assetDetails = assetDetailsRepository.findById(id);
          assetDetailsRepository.delete(assetDetails.get());
        return "Successful";
    }

    @Override
    public AssetDetails updateAssetDetails(AssetDetails asset) {
        AssetDetails assetDetails = assetDetailsRepository.findById(asset.getId()).orElseThrow(NullPointerException::new);
        assetDetails.setLaptop_name(asset.getLaptop_name());
        assetDetails.setEarPhoneStatus(asset.isEarPhoneStatus());
        assetDetails.setLanIdNumber(asset.getLanIdNumber());
        assetDetails.setKeyboardNumber(asset.getKeyboardNumber());
        assetDetails.setMouseStatus(asset.isMouseStatus());
        assetDetails.setLockerCode(asset.getLockerCode());
        assetDetails.setLaptopBag(asset.isLaptopBag());
        assetDetails.setLaptopChargerNumber(asset.getLaptopChargerNumber());
        assetDetails.setMonitorNumber(asset.getMonitorNumber());
        assetDetailsRepository.save(assetDetails);
        return assetDetails;
    }

}
