const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return '';

    const GenerIds = selectedGenres.map((g) => g.id);
    return GenerIds.reduce((acc, curr) => acc + ',' + curr);
};

export default useGenre;
