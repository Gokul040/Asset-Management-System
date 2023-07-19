package com.AMS.AssetManagement.serviceImpl;

import com.AMS.AssetManagement.entity.AssetDetails;
import com.AMS.AssetManagement.entity.AssetLocation;
import com.AMS.AssetManagement.entity.Employee;
import com.AMS.AssetManagement.repository.AssetDetailsRepository;
import com.AMS.AssetManagement.repository.AssetLocationRepo;
import com.AMS.AssetManagement.repository.EmployeeRepo;
import com.AMS.AssetManagement.service.lEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements lEmployeeService {

    @Autowired
    private EmployeeRepo employeeRepository;
    @Autowired
    private AssetDetailsRepository assetDetailsRepository;
    @Autowired
    private AssetLocationRepo assetLocationRepo;

            @Override
            public Employee createEmployee(Employee employee) {

               Optional<AssetLocation> assetLocation = assetLocationRepo.findByPlaceId(employee.getAssetLocation().getPlaceId());
               Optional<Employee> employee2 = employeeRepository.findByAssetLocationPlaceId(employee.getAssetLocation().getPlaceId());

                if (assetLocation.get().getPlaceId() == null) {
                    AssetLocation assetLocation1 = assetLocationRepo.save(employee.getAssetLocation());
                    employee.setAssetLocation(assetLocation1);
                }else if(!employee2.isPresent()) {
                    employee.getAssetLocation().setId(assetLocation.get().getId());
                    employee.getAssetLocation().setPlaceId(assetLocation.get().getPlaceId());
                }
                else if(assetLocation.get().getPlaceId().equals(employee.getAssetLocation().getPlaceId())){
                   Optional <Employee> employee1 = employeeRepository.findByAssetLocationPlaceId(employee.getAssetLocation().getPlaceId());
                    employee1.get().getAssetLocation().setPlaceId(null);
                    employeeRepository.save(employee1.get());
                    AssetLocation assetLocation2= assetLocationRepo.save(employee.getAssetLocation());
                    employee.setAssetLocation(assetLocation2);
                } 
                AssetDetails assetDetails = assetDetailsRepository.save(employee.getAssetDetails());
                employee.setAssetDetails(assetDetails);
                employee.setCreatedDate(new Date());
                employee.setUpdatedDate(new Date());
                employee.setStatus(employee.getStatus());
                employeeRepository.save(employee);
                return employee;
            }
            @Override
            public Optional<Employee> findByEmployeeRollNumber(String no) {
                return employeeRepository.findByEmployeeRollNumber(no);
            }

            @Override
            public List<Employee> getAllEmployees() {
                return employeeRepository.findAll();
            }

    @Override
    public Optional<Employee> getEmployeeById(Long id) {
        return Optional.empty();
    }

    @Override
            public Optional<Employee> getEmployeeById(String id) {
                Optional<Employee> datas = employeeRepository.findByEmployeeRollNumber(id);
                return  datas;
            }

            @Override
            public Optional<Employee> getEmployeeRollNumber(String id) {
               return employeeRepository.findByEmployeeRollNumber(id);
            }


            @Override
            public String updateEmployee(Employee employee) {
               Optional<Employee> existingEmployee = employeeRepository.findById(employee.getId());

                if (!existingEmployee.isPresent()) {
                   return "Doesn't have the exist record";
                }else
//                Employee Details
                existingEmployee.get().setId(existingEmployee.get().getId());
                existingEmployee.get().setEmployeeRollNumber(employee.getEmployeeRollNumber());
                existingEmployee.get().setEmployeeEmail(employee.getEmployeeEmail());
                existingEmployee.get().setEmployeeContact(employee.getEmployeeContact());
                existingEmployee.get().setEmployeeName(employee.getEmployeeName());
                existingEmployee.get().getAssetDetails().setLaptopBag(employee.getAssetDetails().isLaptopBag());
                existingEmployee.get().getAssetDetails().setLockerCode(employee.getAssetDetails().getLockerCode());
                existingEmployee.get().getAssetDetails().setMouseStatus(employee.getAssetDetails().isMouseStatus());
                existingEmployee.get().getAssetDetails().setLaptopChargerNumber(employee.getAssetDetails().getLaptopChargerNumber());
                existingEmployee.get().getAssetDetails().setKeyboardNumber(employee.getAssetDetails().getKeyboardNumber());
                existingEmployee.get().getAssetDetails().setLanIdNumber(employee.getAssetDetails().getLanIdNumber());
                existingEmployee.get().getAssetDetails().setId(employee.getAssetDetails().getId());
                existingEmployee.get().getAssetDetails().setEarPhoneStatus(employee.getAssetDetails().isEarPhoneStatus());
//                Asset details

               Optional<AssetLocation> assetLocation = assetLocationRepo.findByPlaceId(employee.getAssetLocation().getPlaceId());
                if (assetLocation.get().getPlaceId() == null) {
                    AssetLocation assetLocation1 = assetLocationRepo.save(employee.getAssetLocation());
                    existingEmployee.get().setAssetLocation(assetLocation1);
                } else if(assetLocation.get().getPlaceId().equals(employee.getAssetLocation().getPlaceId())){
                    Optional<AssetLocation> assetLocation1 = assetLocationRepo.findByPlaceId(employee.getAssetLocation().getPlaceId());
                    assetLocation1.get().setPlaceId(null);
                    assetLocationRepo.save(assetLocation1.get());
                    AssetLocation assetLocation2= assetLocationRepo.save(employee.getAssetLocation());
                    existingEmployee.get().getAssetLocation().setId(assetLocation2.getId());
                }  else {
                    AssetLocation assetLocation1 = assetLocationRepo.save(employee.getAssetLocation());
                    existingEmployee.get().setAssetLocation(assetLocation1);
                }

                existingEmployee.get().setStatus(employee.getStatus());
                existingEmployee.get().setUpdatedDate(new Date());
                employeeRepository.save(existingEmployee.get());
                return "Successfully Updated!!";
            }

            @Override
            public String deleteEmployee(Long id) {
                employeeRepository.deleteById(id);
                return "Delete Successful";
            }
            public Optional<Employee> getByEmployeeDetailsUsingLocationId(Long id){
             Optional<Employee> employee = employeeRepository.findByAssetLocationId(id);
             return employee;
            }

}
