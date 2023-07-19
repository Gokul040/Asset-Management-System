package com.AMS.AssetManagement.controller;

import com.AMS.AssetManagement.entity.AssetLocation;
import com.AMS.AssetManagement.entity.Employee;
import com.AMS.AssetManagement.exception.UserAlreadyExistsException;
import com.AMS.AssetManagement.repository.AssetLocationRepo;
import com.AMS.AssetManagement.repository.EmployeeRepo;
import com.AMS.AssetManagement.serviceImpl.AssetLocationService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/assetLocation")
public class AssetLocationController {

    @Autowired
    private AssetLocationRepo assetLocationRepo;
    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private AssetLocationService assetLocationService;

    @PostMapping("/newLocation")
    public String newLocation(@RequestBody AssetLocation assetLocation) {
        Optional<AssetLocation> employee1 = assetLocationRepo.findByPlaceId(assetLocation.getPlaceId());

        if (employee1.isPresent()) {
          return "Employee with Roll Number " + assetLocation.getPlaceId() + " already exists!";
        } else {
            AssetLocation assetLocation1 = assetLocationService.createAssetLocation(assetLocation);
            return "Success! " + assetLocation1;
        }
    }


    @GetMapping("/get-one-location/{id}")
    public ResponseEntity<AssetLocation> getAssetLocationById(@PathVariable("id")Long  id) {
        Optional<Employee> employee = employeeRepo.findById(id);
        if (employee.isPresent()) {
            AssetLocation assetLocation = assetLocationService.getByLocationId(id);
            return new ResponseEntity<>(assetLocation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/get-all-location")
    public List<AssetLocation> getAllAsset() {

        return  assetLocationService.getAllAssetLocation();
    }

    @PutMapping("/update-location")
    public String updateAsset(@RequestBody AssetLocation assetLocation) {
     
        Optional<AssetLocation> assetLocation2 = assetLocationRepo.findByPlaceId(assetLocation.getPlaceId());

        if(assetLocation2.isPresent()){
            throw new UserAlreadyExistsException( "Place ID already exists");
        }
        else{
            assetLocationService.updateAssetLocation(assetLocation);
            return "Update Successful";
        }
    }

    @DeleteMapping("/delete-location/{deleteId}")
    public String deleteAssetById(@PathVariable("deleteId") Long locationId) {
        assetLocationService.deleteAssetLocation(locationId);
        return "Delete Successful";
    }

}
