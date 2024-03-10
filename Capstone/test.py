import validators

def check_url_validity(url):
    if validators.url(url):
        print(f"The URL {url} is valid.")
    else:
        print(f"The URL {url} is not valid.")

# Example usage
check_url_validity("https://example.com")
