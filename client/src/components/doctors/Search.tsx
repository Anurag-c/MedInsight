import { Box, TextField, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, SelectChangeEvent, Chip, Typography, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { Helper } from "../../services/helper";
import { SearchOutlined } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Search = ({ onSearch }: { onSearch: Function }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);
    const [specialitiesList, setSpecialitiesList] = useState<string[]>([]);
    const [treatsCovid, setTreatsCovid] = useState<string>("null");

    useEffect(() => {
        Helper.getAllSpecialities().then((specialities: any) => setSpecialitiesList(specialities));
    }, []);

    const handleChange = (e: SelectChangeEvent<typeof selectedSpecialities>) => {
        const {
            target: { name, value },
        } = e;
        setSelectedSpecialities(typeof value === 'string' ? value.split(',') : value)
    };

    const handleSearch = () => {
        const payload = {
            searchText: searchText,
            treatsCovid: treatsCovid,
            ...selectedSpecialities.length && { specialities: selectedSpecialities }
        }
        onSearch(payload);
    }

    const handleTreatsCovidChange = (value: string) => {
        if(value == treatsCovid) {
            setTreatsCovid("null");
        } else {
            setTreatsCovid(value);
        }
    }

    return (
        <Box bgcolor={'#efefef85'} p={2} borderRadius={4}>
            <Typography variant="h6" fontWeight={600} mb={2}>Search for doctors</Typography>
            <TextField
                id="search"
                name="search"
                label="Search for doctors"
                variant="outlined"
                size="small"
                placeholder="Search for a doctor by name, keyword, specialization or even symptoms"
                fullWidth
                value={searchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
            />
            <Box mt={3} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box display={'flex'} alignItems={'center'} columnGap={2}>
                    <FormControl sx={{ width: 250 }} size="small">
                        <InputLabel id="specialities">Speciality</InputLabel>
                        <Select
                            labelId="specialities"
                            id="specialities"
                            multiple
                            name="specialities"
                            value={selectedSpecialities}
                            onChange={(e: SelectChangeEvent<typeof selectedSpecialities>) => handleChange(e)}
                            input={<OutlinedInput label="Speciality" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((item: any) => (
                                        <Chip key={item} label={item} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {specialitiesList.map((speciality: any) => (
                                <MenuItem key={speciality} value={speciality}>
                                    <Checkbox checked={selectedSpecialities.indexOf(speciality) > -1} />
                                    <ListItemText primary={speciality} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: 250 }} size="small">
                        <ButtonGroup>
                            <Button
                                variant={treatsCovid === "true" ? "contained" : "outlined"}
                                onClick={() => handleTreatsCovidChange("true")}
                            >
                                Treats Covid
                            </Button>
                        </ButtonGroup>
                    </FormControl>
                </Box>
                <Button variant="contained" endIcon={<SearchOutlined />} onClick={handleSearch}>
                    Search
                </Button>
            </Box>
        </Box>
    );
}

export default Search;
