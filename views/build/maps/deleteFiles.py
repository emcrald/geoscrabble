# DELETE SPECIFIC FILES
# import os

# base_dir = ""

# for root, dirs, files in os.walk(base_dir):
#     for file in files:

#         if file != "1024.png":

#             file_path = os.path.join(root, file)

#             os.remove(file_path)
#             print(f"Deleted: {file_path}")




# RENAME COUNTRIES
# import os
# import pycountry

# def rename_folders(path):
#     folders = os.listdir(path)
    
#     for folder in folders:
#         folder_path = os.path.join(path, folder)
        
#         if os.path.isdir(folder_path):
#             try:
#                 country = pycountry.countries.get(alpha_2=folder.upper())
#                 full_country_name = country.name
#             except AttributeError:
#                 print(f"Cannot find country name for code: {folder}")
#                 continue
            
#             os.rename(folder_path, os.path.join(path, full_country_name))
#             print(f"Renamed {folder} to {full_country_name}")

# folder_path = "C:/Users/Lietotajs/Documents/GitHub/geoscrabble/maps/all"

# rename_folders(folder_path)